import React, { useState } from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'

const ScrollButton = () => {

    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true)
        }
        else if (scrolled <= 300) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (

        <OverlayTrigger
            placement='left'
            overlay={
                <Tooltip>
                    Lên Đầu Trang
                </Tooltip>
            }
        >
            <Button
                className='rounded-pill'
                style={{
                    display: visible ? 'inline' : 'none',
                    width: '40px',
                    position: 'fixed',
                    right: '10px',
                    bottom: '20px',
                    zIndex: '1',
                    cursor: 'pointer',
                    color: 'white',
                    opacity: '0.7',
                    padding: '3px 0px'
                }}
                onClick={scrollToTop}
            >
                <FontAwesomeIcon icon={faArrowUp} style={{fontSize: '30px', fontWeight: 'bold', margin: '0px' }} />
            </Button>
        </OverlayTrigger>
    );
}

export default ScrollButton;
