import logo from '../img/logo.svg'
import { Helmet } from 'react-helmet'
export default function text(){

    return(
        <>
            <Helmet>
                <meta charset="UTF-8"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <title>CompuFinder</title>
                <link rel='icon' href={logo} ></link>
            </Helmet>

        </>
    )

}
