import React from "react";
import TopNav from "../comom/topNav";
import map from "lodash/map";
import "./index.less";

const icon = (
    <svg
        className="octicon octicon-mark-github v-align-middle"
        height="32"
        viewBox="0 0 16 16"
        version="1.1"
        width="32"
        aria-hidden="true"
    >
        <path
            fillRule="evenodd"
            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
        ></path>
    </svg>
);

const data = [
    {
        id: "gobang",
        name: "五子棋",
        img: "//file.iweijie.cn/static/uploads/2021-05/image/0d105aeea6944743142a6f395d547ba02.png",
        description: "AI 战胜人类，只是时间的问题！！",
        github: "https://github.com/iweijie/gobang",
        url: "http://static.iweijie.cn/gobang/",
    },

    {
        id: "tetris",
        name: "俄罗斯方块",
        img: "//file.iweijie.cn/static/uploads/2021-05/image/0d5ce2bf3628bce6211a62f4a30e7af72.png",
        description: "童年的回忆！！",
        github: "https://github.com/iweijie/react-tetris",
        url: "http://static.iweijie.cn/tetris/",
    },
];

const Game = () => {
    return (
        <div>
            <TopNav isFixed />
            <ul className="game">
                {map(data, (item) => {
                    const { id, img, description, github, url, name } = item;
                    return (
                        <div className="article-list-item" key={id}>
                            <div
                                className="article-list-item-img"
                                style={{ backgroundImage: `url(${img})` }}
                            >
                            </div>
                            <div className="article-list-item-right">
                                <h3 className="display-none">{name}</h3>
                                <a
                                    href={url}
                                    target="_blank"
                                    className="article-list-item-title underline"
                                    title={name}
                                >
                                    {name}
                                </a>
                                <a
                                    href={github}
                                    target="_blank"
                                    className="article-list-item-edit"
                                    title="github 链接"
                                >
                                    {icon}
                                    {/* <Icon type="iconedit" theme="outlined" /> */}
                                </a>
                                <p className="article-list-item-description">
                                    {description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </ul>
        </div>
    );
};

export default Game;
