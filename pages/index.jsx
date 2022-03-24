import App from '/voxeliface/components/App';
import Main from '/voxeliface/components/Main';
import Header from '/components/Header';
import Button from '/voxeliface/components/Button';
import Typography from '/voxeliface/components/Typography';

export default function Home() {
    return (
        <App title="Voxelified">
            <Header>
                <Button href="/login">
                    Account Login
                </Button>
            </Header>
            <Main>
                <Typography
                    text="This is a placeholder, nothing to see yet!"
                />
            </Main>
        </App>
    );
};