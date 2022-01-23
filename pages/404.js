import App from '../components/App';
import Main from '../components/Main';
import Grid from '../components/Grid';
import Header from '../components/Header';
import Typography from '../components/Typography';

export default function PageNotFound() {
    return (
        <App>
            <Header text="voxel" icon={"/favicon.ico"}/>
            <Main>
                <Typography
                    text="404"
                    size="2rem"
                />
                <Typography
                    text="You have failed the challenge."
                />
            </Main>
        </App>
    );
};