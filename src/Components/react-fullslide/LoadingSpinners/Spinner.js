import React from 'react'
import styled from 'styled-components'
import './css-loading-spinners.css'

export const LoadingSpinner = () => {
    const SpinnerContainer = styled.div`
        display: flex;
        margin-top:10%;
    `;
    return (
        <SpinnerContainer>
            <div className="cls-spinner">
                <div className="cls-circle cls-spin"></div>
            </div>
        </SpinnerContainer>
    )
}


export const ExpandingLoadingSpinner = () => {
    const SpinnerContainer = styled.div`
        display: flex;
        width: 100%;
        height: 100%;
    `;
    return (
        <SpinnerContainer>
            <div className="cls-spinner">
                <div className="cls-circle cls-spin"></div>
            </div>
        </SpinnerContainer>
    )
}