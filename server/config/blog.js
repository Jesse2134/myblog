// 全局配置参数
const Blog = {
    website: {
        url: '',
        port: 5501,
        secret: 'jesse_2134',
        Bearer: "Bearer "
    },
    db: {
        local: '/Users/jesse/Workspaces/MyBlog/myblog/server/db',
        url: 'mongodb://localhost:27018/blog'
    }
};
module.exports = Blog;
