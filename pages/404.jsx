import App from '/voxeliface/components/App';
import Main from '/voxeliface/components/Main';
import Header from '/components/Header';
import Typography from '/voxeliface/components/Typography';

export default function PageNotFound() {
    return (
        <App>
            <Header/>
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