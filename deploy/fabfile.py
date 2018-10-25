from fabric import Connection
from invoke import task, Exit

@task
def hello(ctx):
    print("Hello world!")