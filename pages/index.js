import App from '../components/App';
import Main from '../components/Main';
import Header from '../components/Header';
import Typography from '../components/Typography';

export default function Home() {
    return (
        <App>
            <Header text="voxel" icon={"/favicon.ico"}/>
            <Main>
                <Typography
                    text="hello, next.js page!"
                />
                <Typography
                    text="hello cool person! ;) :) (: (;"
                />
                <Typography
                    text="boo!"
                />
            </Main>
        </App>
    );
};