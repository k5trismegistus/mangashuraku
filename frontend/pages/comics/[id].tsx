import { apiClient } from "../../utils/apiClient"

import SinglePageReader from '../../components/comic_reader/SinglePageReader'

const Comic =  ({ comic }) => {
  return (
    <div>
      <SinglePageReader
        comic="comic"
      />
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
  const comic = await apiClient.getComic({ id: '5bdc501b83e7550010fd328c' })
  return { props: { comic } }
}

export default Comic