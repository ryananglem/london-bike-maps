import React from 'react'
import PropTypes from 'prop-types'
import cycleLogo from '../content/images/sc-partner.png'

const About = ({ text }) => {
    return (
        <div
            style={{
                padding: 10 + 'px',
                paddingTop: 50 + 'px',
                display: 'block',
                textAlign: 'center',
            }}
        >
            <h2 style={{ paddingBottom: 50 + 'px' }}>{text.appName}</h2>
            <div>
                <span> {text.thisProjectUses} </span>
                <a href="https://api.tfl.gov.uk/">
                    {text.projectApiDescription}
                </a>
                <span> {text.thisProjectReason} </span>
            </div>
            <div>
                <img alt={text.imageDescription} src={cycleLogo} />
            </div>
            <div style={{ paddingTop: 100 + 'px' }}>
                <span> {text.writtenBy} </span>
                <a href="https://www.linkedin.com/in/ryananglem/">
                    Ryan Anglem
                </a>
                <span> {text.technology} </span>
            </div>
            <br />
            <br />
            <div style={{ fontSize: 'small' }}>
                <span>&copy; 2017 - Radicle Action Development Ltd </span>
            </div>
        </div>
    )
}
About.propTypes = {
    text: PropTypes.object.isRequired,
}
export default About
