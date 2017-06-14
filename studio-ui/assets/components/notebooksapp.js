/**
 * @file Desciption:
 * @author1 huanghaiping(huanghaiping02@baidu.com)
 * @author2 liunanke(liunanke@baidu.com)
 * Created on 17/5/31
 */
import '../vendors/bootstrap/css/bootstrap.min.css';
import '../css/main.css';
import React from 'react';
import Head from './head';
import StudioHead from './studiohead';
import NoteCardBoard from './notebooksApp/notecardboard';


require('react-hot-loader/patch');

export default class NotebooksApp extends React.Component {


    render() {
        return (
            <div>
                <Head/>
                <StudioHead/>
                <NoteCardBoard/>
            </div>
        );
    }
}






