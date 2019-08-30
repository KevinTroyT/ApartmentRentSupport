import React from 'react';
import ReactDom from 'react-dom';
import getRouter from './router/router';
import "./layout/css/reset.css"
import "./layout/css/index.less"

ReactDom.render(getRouter(), document.getElementById('root'));
