import App from '/voxeliface/components/App';
import Main from '/voxeliface/components/Main';
import Link from '/voxeliface/components/Link';
import Header from '/components/Header';
import Typography from '/voxeliface/components/Typography';

export default function Home() {
    return (
        <App title="Voxelified Home">
            <Header>
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