import App from '../components/App';
import Main from '../components/Main';
import Link from '../components/Link';
import Header from '../components/Header';
import Typography from '../components/Typography';

export default function Home() {
    return (
        <App title="Voxel Home">
            <Header text="voxel" icon={"/voxel-white.svg"}>
                <Link href="/login" color="#ffffffb8" weight={400} hoverColor="white">
                    Login
                </Link>
            </Header>
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