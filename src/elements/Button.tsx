import * as React from 'react';

import { Bulma, removeStateProps, removeColorProps, removeFullWidthProps } from './../bulma';
import { classNames, getHTMLProps } from './../helpers';

export interface Button<T> extends
    Bulma.Render, Bulma.State, Bulma.Color, Bulma.FullWidth,
    React.HTMLProps<T> {
    isLink?: boolean,
    isOutlined?: boolean,
    isInverted?: boolean,
}

export const Button: React.SFC<Button<HTMLButtonElement | HTMLAnchorElement>> = (props) => {
    const className = classNames(props, {
        button: true,
        'is-link': props.isLink,
        'is-outlined': props.isOutlined,
        'is-inverted': props.isInverted,
    });
    const { render, isLink, isOutlined, isInverted, ...rest } = props;
    const HTMLProps = getHTMLProps(
        rest,
        removeStateProps,
        removeColorProps,
        removeFullWidthProps,
    );

    if (render) return render({ ...HTMLProps, className });

    const anchor = (
        <a {...HTMLProps} role='button' className={className}>
            {props.children}
        </a>
    )

    const button = (
        <button {...HTMLProps} type={props.type || 'button'} className={className}>
            {props.children}
        </button>
    )

    return props.href ? anchor : button;
}