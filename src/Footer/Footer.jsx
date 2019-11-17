import React from 'react';
import Script from "react-inline-script"
class Footer extends React.Component {

    render() {

        return (
            <footer className="footer">
                <div className="container">
                    <p className="copyright">Copyright 2018. All Right Reserved.</p>
                </div>
                <Script>
                    {
                        $(function () {
                            setTimeout(function () { $(".alert-success").hide(); }, 10000);

                        })
                    }
                </Script>
            </footer>


        );
    }
}

export default Footer;
