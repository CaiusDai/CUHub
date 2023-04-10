import { Table } from 'antd'

const data = [
    { tag: 'Tree Hole', postNum: '178' },
    { tag: 'Job seeking', postNum: '150' },
    { tag: 'Trading', postNum: '72' },
    { tag: 'Study', postNum: '33' },
]

const columns = [
    {
        title: 'Trending',
        dataIndex: 'tag',
        key: 'tag',
    },
    {
        title: 'Post Num',
        dataIndex: 'postNum',
        key: 'postNum',
    },
]

// there is no input form the frontend,
// trending( if any ), is needed from backend,
// you are free to send any data to frontend, I will
// organize them to ensure they display in a correct format

const TrendingTable = () => {
    return (
        <Table
            dataSource={data}
            columns={columns}
            pagination={false}
            style={{ border: '1px solid #f0f0f0' }}
        />
    )
}

export default TrendingTable
