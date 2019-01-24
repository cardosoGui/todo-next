import React from "react"
import App, { Container } from "next/app"
import Head from "next/head"
import AppContext from "../components/AppContext"

export default class MyApp extends App {
    static async getInitialProps({ Component, router, ctx }) {
        let pageProps = {}

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }

        return { pageProps }
    }

    state = {
        finish: true
    }

    render() {
        const { Component, pageProps } = this.props
        const setAppState = this.setState.bind(this)
        return (
            <AppContext.Provider value={{ ...this.state, setAppState }}>
                <Container>
                    <Head>
                        <meta
                            name="viewport"
                            content="width=device-width, initial-scale=1.0"
                        />
                        <link
                            href="https://fonts.googleapis.com/css?family=Press+Start+2P"
                            rel="stylesheet"
                        />
                        <link
                            href="https://unpkg.com/nes.css/css/nes.css"
                            rel="stylesheet"
                        />
                        <link
                            rel="stylesheet"
                            href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
                            integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
                            crossOrigin="anonymous"
                        />
                        <style>{` html, body, pre, code, kbd, samp {
          font-family:  'Press Start 2P', cursive !important;"
      } /`}</style>
                    </Head>
                    <Component {...pageProps} />
                </Container>
            </AppContext.Provider>
        )
    }
}
