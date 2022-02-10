import App from '../components/App';
import Main from '../components/Main';
import Header from '../components/Header';
import Typography from '../components/Typography';

export default function TermsOfService() {
    return (
        <App>
            <Header text="voxel" icon={"/voxel-white.svg"}/>
            <Main>
                <Typography
                    text="Terms of Service."
                    size="2rem"
                />
            </Main>
        </App>
    );
};