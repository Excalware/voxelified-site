import React, { useState } from 'react';
import { styled } from '@stitches/react';
import * as Icon from 'react-bootstrap-icons';

import Grid from '/voxeliface/components/Grid';
import Typography from '/voxeliface/components/Typography';
const MenuButtonGrid = styled(Grid, {
    top: 0,
    right: 0,
    height: 64,
    display: 'flex',
    zIndex: 10000,
    position: 'fixed',
    alignItems: 'center',
    marginRight: 16
});

const MenuButton = styled('button', {
    color: 'white',
    border: 'none',
    padding: 0,
    display: 'none',
    overflow: 'hidden',
    fontSize: '1.5rem',
    background: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',

    '&:after': {
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0,
        content: '',
        position: 'absolute',
        transform: 'scale(6, 6)',
        transition: 'transform .5s, opacity 1s',
        pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, #fff 10%, transparent 10%)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50%'
    },

    '&:active:after': {
        opacity: .3,
        transform: 'scale(0, 0)',
        transition: '0s'
    },

    '&:hover': {
        cursor: 'pointer'
    },

    '@media screen and (max-width: 768px)': {
        display: 'flex'
    }
});

export function Root({ data, buttons }) {
    const [open, setOpen] = useState(true);
    return (
        <Grid>
            <Grid
                direction="vertical"
                justifyContent="space-between"
                css={{
                    height: '100%',
                    zIndex: 1000,
                    minWidth: '16rem',
                    overflow: 'hidden',
                    maxHeight: open ? "100%" : "0px",
                    transition: 'max-height 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                    borderRight: '1px solid $secondaryBorder',

                    '@media screen and (max-width: 768px)': {
                        '&': {
                            width: '100%',
                            height: '100%',
                            position: 'absolute'
                        },
                        '& > button': {
                            display: 'unset'
                        }
                    }
                }}
            >
                <Grid direction="vertical">
                    {data.map((category, index) =>
                        <Category key={index} name={category[0]}>
                            {category[1].map((link, index) =>
                                <Link key={index} name={link[0]} link={link[1]} icon={link[2]}/>
                            )}
                        </Category>
                    )}
                </Grid>
                {buttons &&
                    <Category name="">
                        {buttons.map((link, index) =>
                            <Link key={index} name={link[0]} link={link[1]} icon={link[2]}/>
                        )}
                    </Category>
                }
            </Grid>
            <MenuButtonGrid>
                <MenuButton onClick={() => setOpen(!open)}>
                    <Icon.List/>
                </MenuButton>
            </MenuButtonGrid>
        </Grid>
    );
};

export function Category({ name, children }) {
    return (
        <Grid width="100%" padding="1.25rem .75rem" direction="vertical">
            <Typography size=".875rem" color="$secondaryColor" margin=".5rem 1rem" family="Nunito Sans">
                {name}
            </Typography>
            <Grid spacing={4} direction="vertical">
                {children}
            </Grid>
        </Grid>
    );
};

const StyledLink = styled('a', {
    width: '100%',
    color: '$primaryColor',
    display: 'flex',
    padding: '.25rem 1rem',
    fontSize: '.8rem',
    fontWeight: 400,
    alignItems: 'center',
    fontFamily: 'Nunito',
    transition: 'background 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    borderRadius: 8,
    justifyContent: 'space-between',
    textDecoration: 'none',

    '&:hover': {
        cursor: 'pointer',
        background: '$buttonBackground'
    },
    '&:disabled': {
        cursor: 'not-allowed'
    }
});

export function Link({ name, icon, link, onpage }) {
    const LinkIcon = icon && Icon[icon];
    return (
        <StyledLink href={link instanceof Function ? undefined : link} target="_self" onClick={link instanceof Function ? link : undefined} css={{
            background: onpage ? "rgba(255, 255, 255, 0.06)" : null
        }}>
            {name}
            {LinkIcon &&
                <LinkIcon/>
            }
        </StyledLink>
    );
};