import React from 'react';
import history from "tool/history";
import { Router, Switch, Route } from 'react-router-dom';
// import Bundle from '../bundle/bundle'
import Loadable from 'react-loadable';
import Verification from "page/comom/Verification";

/**
 * 首页
 */

const AsyncHome = Loadable({
    loader: () => import('../page/home/App'),
    loading:()=>null,
    render(loaded, props) {
        let Component = loaded.default;
        return <Verification><Component {...props} /></Verification>
    }
})
// /**
//  *  查看文章详情
//  */
const AsyncArticleDetail = Loadable({
    loader: () => import('../page/articleDetail'),
    loading:()=>null,
    render(loaded, props) {
        let Component = loaded.default;
        return <Verification><Component {...props} /></Verification>
    }
})
// // const AsyncArticleDetail = (props) => (
// //     <Bundle load={() => import('../page/articleDetail')}>
// //         {(ArticleDetail) => <Verification key="4"><ArticleDetail {...props} /></Verification>}
// //     </Bundle>
// // )
// /**
//  *  登入
//  */
const AsyncLogin = Loadable({
    loader: () => import('../page/login'),
    loading:()=>null,
    render(loaded, props) {
        let Component = loaded.default;
        return <Verification><Component {...props} /></Verification>
    }
})
// const AsyncLogin = (props) => (
//     <Bundle load={() => import('../page/login')}>
//         {(Login) => <Verification><Login {...props} /></Verification>}
//     </Bundle>
// )
// /**
//  * 碎碎念
//  */
const AsyncSelftalking = Loadable({
    loader: () => import('../page/selftalking'),
    loading:()=>null,
    render(loaded, props) {
        let Component = loaded.default;
        return <Verification><Component {...props} /></Verification>
    }
})
// const AsyncSelftalking = (props) => (
//     <Bundle load={() => import('../page/selftalking')}>
//         {(Selftalking) => <Verification verify><Selftalking {...props} /></Verification>}
//     </Bundle>
// )
// /**
//  * 设置界面
//  */
const AsyncSet = Loadable({
    loader: () => import('../page/set'),
    loading:()=>null,
    render(loaded, props) {
        let Component = loaded.default;
        return <Verification><Component {...props} /></Verification>
    }
})
// const AsyncSet = (props) => (
//     <Bundle load={() => import('../page/set')}>
//         {(Setting) => <Verification verify><Setting {...props} /></Verification>}
//     </Bundle>
// )
// /**
//  * 关于
//  */
const AsyncAbout = Loadable({
    loader: () => import('../page/about'),
    loading:()=>null,
    render(loaded, props) {
        let Component = loaded.default;
        return <Verification><Component {...props} /></Verification>
    }
})
// const AsyncAbout = (props) => (
//     <Bundle load={() => import('../page/about')}>
//         {(About) => <Verification><About {...props} /></Verification>}
//     </Bundle>
// )
/**
 *  404
 */
const AsyncNoFound = Loadable({
    loader: () => import('../page/404'),
    loading:()=>null,
    render(loaded, props) {
        let Component = loaded.default;
        return <Verification><Component {...props} /></Verification>
    }
})
// const AsyncNoFound = (props) => (
//     <Bundle load={() => import('../page/404/404')}>
//         {(NoFound) => <NoFound {...props} />}
//     </Bundle>
// )

export default [
    {
        path: '/',
        exact: true,
        component: AsyncHome
    },
    {
        path: '/tags/:id',
        exact: true,
        component: AsyncHome
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