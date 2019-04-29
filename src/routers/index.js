import React from 'react';
// import Bundle from '../bundle/bundle'
import Loadable from 'react-loadable';
import Verification from "page/comom/Verification";
import actions from "actions/index"

/**
 * 首页
 */

const AsyncHome = Loadable({
    loader: () => import(/* webpackChunkName: "home" */ '../page/home/App'),
    loading: () => null,
    render(loaded, props) {
        let Component = loaded.default;
        return <Verification><Component {...props} /></Verification>
    }
})
// /**
//  *  查看文章详情
//  */
const AsyncArticleDetail = Loadable({
    loader: () => import(/* webpackChunkName: "articleDetail" */ '../page/articleDetail'),
    loading: () => null,
    render(loaded, props) {
        let Component = loaded.default;
        return <Verification><Component {...props} /></Verification>
    }
})
// /**
//  *  登入
//  */
const AsyncLogin = Loadable({
    loader: () => import(/* webpackChunkName: "login" */ '../page/login'),
    loading: () => null,
    render(loaded, props) {
        let Component = loaded.default;
        return <Verification><Component {...props} /></Verification>
    }
})
// /**
//  * 碎碎念
//  */
const AsyncSelftalking = Loadable({
    loader: () => import(/* webpackChunkName: "selftalking" */ '../page/selftalking'),
    loading: () => null,
    render(loaded, props) {
        let Component = loaded.default;
        return <Verification verify><Component {...props} /></Verification>
    }
})
// /**
//  * 设置界面
//  */
const AsyncSet = Loadable({
    loader: () => import(/* webpackChunkName: "set" */ '../page/set'),
    loading: () => null,
    render(loaded, props) {
        let Component = loaded.default;
        return <Verification verify><Component {...props} /></Verification>
    }
})
// /**
//  * 关于
//  */
const AsyncAbout = Loadable({
    loader: () => import(/* webpackChunkName: "about" */ '../page/about'),
    loading: () => null,
    render(loaded, props) {
        let Component = loaded.default;
        return <Verification><Component {...props} /></Verification>
    }
})
/**
 *  404
 */
const AsyncNoFound = Loadable({
    loader: () => import(/* webpackChunkName: "notfound" */ '../page/404'),
    loading: () => null,
    render(loaded, props) {
        let Component = loaded.default;
        return <Verification><Component {...props} /></Verification>
    }
})

const routers = [
    {
        path: '/',
        exact: true,
        loadData: (match, store) => {
            const { dispatch } = store
            let params = {
                page: 1,
                pageSize: 10
            }
            let promiseAll = [
                actions.selftalkingListActionAsync()(dispatch),
                actions.AsyncrecommendList()(dispatch),
                actions.asyncGetTagsList()(dispatch),
            ]
            if (match.params.id) {
                params.tag = match.params.id
            }
            promiseAll.push(actions.getArticleListAsync(params)(dispatch))
            return promiseAll;
        },
        component: AsyncHome,
        isServicesRendered: true
    },
    {
        path: '/tags/:id',
        exact: true,
        loadData: (match, store) => {
            const { dispatch } = store
            let params = {
                page: 1,
                pageSize: 10
            }
            let promiseAll = [
                actions.selftalkingListActionAsync()(dispatch),
                actions.AsyncrecommendList()(dispatch),
                actions.asyncGetTagsList()(dispatch),
            ]
            if (match.params.id) {
                params.tag = match.params.id
            }
            promiseAll.push(actions.getArticleListAsync(params)(dispatch))
            return promiseAll;
        },
        component: AsyncHome,
        isServicesRendered: true
    },
    {
        path: '/selftalking',
        exact: true,
        component: AsyncSelftalking
    },
    {
        path: '/article/detail/:id',
        component: AsyncArticleDetail,
        exact: true,
        loadData: (match, store) => {
            const { dispatch } = store
            let id = match.params.id;
            let promiseAll = [];
            promiseAll.push(actions.getArticleDetails({ id })(dispatch))
            return promiseAll;
        },
        isServicesRendered: true
    },
    {
        path: '/login',
        component: AsyncLogin,
        exact: true,
    },
    {
        path: '/set',
        component: AsyncSet,
    },
    {
        path: '/about',
        component: AsyncAbout,
        exact: true,
        isServicesRendered: true
    },
    {
        path: '/404',
        component: AsyncNoFound,
        exact: true,
    },
    {
        path: '*',
        component: AsyncNoFound
    }
]

routers.commonLoadData = (store) => {
    const { dispatch } = store
    const promiseAll = [
        actions.getHomeBgImageActionASync()(dispatch),
        // dispatch(actions.isServerRendering(true)),
        // 登入状态改为客户端去验证
        // actions.syncuserInfoCheckAction()(dispatch)
    ]

    return promiseAll
}

export default routers