from fabric import Connection
from invoke import task, run
import os

COMPRESSED_NAME = 'mangashuraku.tar.gz'
WORKING_DIR = '/home/kyamamoto/apps/mangashuraku'
@task
def production(ctx):
    ctx.name = 'mangashuraku'
    ctx.host = os.getenv('HOST')
    ctx.user = os.getenv('USER')
    ctx.connect_kwargs.password = os.getenv('PASSWORD')

@task
def compress(ctx):
    run(f'rm -f /tmp/{COMPRESSED_NAME}')
    run(f'tar --exclude node_modules --exclude dist --exclude .cache -czf /tmp/{COMPRESSED_NAME} src/api src/frontend src/docker-compose.prod.yml')

@task
def rebuildcontainer(ctx):
    production(ctx)
    with Connection(ctx.host, user=ctx.user, connect_kwargs=ctx.connect_kwargs) as conn:
        conn.run(f'cd {WORKING_DIR}; docker-compose -f docker-compose.prod.yml stop')
        conn.run(f'cd {WORKING_DIR}; docker-compose -f docker-compose.prod.yml build --no-cache')
    restart(ctx)

@task
def rebuild(ctx):
    production(ctx)
    with Connection(ctx.host, user=ctx.user, connect_kwargs=ctx.connect_kwargs) as conn:
        conn.run(f'cd {WORKING_DIR}; docker-compose -f docker-compose.prod.yml run --rm api npm run build')
        conn.run(f'cd {WORKING_DIR}; docker-compose -f docker-compose.prod.yml run --rm frontend rm -R dist/')
        conn.run(f'mkdir {WORKING_DIR}/frontend/dist')
        conn.run(f'cd {WORKING_DIR}; docker-compose -f docker-compose.prod.yml run --rm frontend rm -R .cache/')
        conn.run(f'cd {WORKING_DIR}; docker-compose -f docker-compose.prod.yml run --rm frontend npm run build')
        conn.run(f'cp {WORKING_DIR}/frontend/serve.json {WORKING_DIR}/frontend/dist')

@task
def restart(ctx):
    production(ctx)
    with Connection(ctx.host, user=ctx.user, connect_kwargs=ctx.connect_kwargs) as conn:
        conn.run(f'cd {WORKING_DIR}; docker-compose -f docker-compose.prod.yml stop')
        conn.run(f'cd {WORKING_DIR}; docker-compose -f docker-compose.prod.yml up -d')

@task
def deploy(ctx):
    production(ctx)
    compress(ctx)
    with Connection(ctx.host, user=ctx.user, connect_kwargs=ctx.connect_kwargs) as conn:
        conn.run(f'mkdir -p {WORKING_DIR}')
        conn.run(f'rm -f /tmp/{COMPRESSED_NAME}')
        conn.put(f'/tmp/{COMPRESSED_NAME}', remote=f'/tmp/{COMPRESSED_NAME}')
        conn.run(f'tar -zxvf /tmp/{COMPRESSED_NAME} -C {WORKING_DIR} --overwrite --strip 1')
        conn.run(f'cp {WORKING_DIR}/frontend/serve.json {WORKING_DIR}/frontend/dist')
    rebuild(ctx)
