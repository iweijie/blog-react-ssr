import React from 'react';
import history from "tool/history";
import { Router, Switch, Route } from 'react-router-dom';
// import Bundle from '../bundle/bundle'
import Loadable from 'react-loadable';
import Verification from "page/comom/Verification";

/**
 * 首页
 */
// const AsyncHome = (props) => (
//     <Bundle load={() => import('../page/home/App')}>
//         {(Home) => <Verification key="1"><Home {...props} /></Verification>}
//     </Bundle>
// )

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
// // const AsyncArticleDetail = (props) => (
// //     <Bundle load={() => import('../page/articleDetail')}>
// //         {(ArticleDetail) => <Verification key="4"><ArticleDetail {...props} /></Verification>}
// //     </Bundle>
// // )
// const AsyncArticleDetail = Loadable({
//     loader: () => import('../page/articleDetail'),
//     render(loaded, props) {
//         let Component = loaded.ArticleDetail;
//         return <Verification><Component {...props} /></Verification>
//     }
// })
// /**
//  *  登入
//  */
// const AsyncLogin = (props) => (
//     <Bundle load={() => import('../page/login')}>
//         {(Login) => <Verification><Login {...props} /></Verification>}
//     </Bundle>
// )
// /**
//  * 碎碎念
//  */
// const AsyncSelftalking = (props) => (
//     <Bundle load={() => import('../page/selftalking')}>
//         {(Selftalking) => <Verification verify><Selftalking {...props} /></Verification>}
//     </Bundle>
// )
// /**
//  * 设置界面
//  */
// const AsyncSet = (props) => (
//     <Bundle load={() => import('../page/set')}>
//         {(Setting) => <Verification verify><Setting {...props} /></Verification>}
//     </Bundle>
// )
// /**
//  * 关于
//  */
// const AsyncAbout = (props) => (
//     <Bundle load={() => import('../page/about')}>
//         {(About) => <Verification><About {...props} /></Verification>}
//     </Bundle>
// )
/**
 *  404
 */
// const AsyncNoFound = (props) => (
//     <Bundle load={() => import('../page/404/404')}>
//         {(NoFound) => <NoFound {...props} />}
//     </Bundle>
// )
const AsyncNoFound = Loadable({
    loader: () => import('../page/404/404'),
    loading:()=>null,
    render(loaded, props) {
        debugger;
        let Component = loaded.default;
        return <Verification><Component {...props} /></Verification>
    }
})

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
    // {
    //     path: '/selftalking',
    //     exact: true,
    //     component: AsyncSelftalking
    // },
    // {
    //     path: '/article/detail/:id',
    //     component: AsyncArticleDetail,
    //     exact: true,
    // },
    // {
    //     path: '/login',
    //     component: AsyncLogin,
    //     exact: true,
    // },
    // {
    //     path: '/set',
    //     component: AsyncSet,
    // },
    // {
    //     path: '/about',
    //     component: AsyncAbout,
    //     exact: true,
    // },
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

//  () => (
//     <Router history={history}>
//         <Switch>
//             {routes.map((route, i) => (
//                 <Route key={i} {...route} />
//             ))}
//         </Switch>
//     </Router>
// )