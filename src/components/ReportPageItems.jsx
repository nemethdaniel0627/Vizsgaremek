import React from "react";

export default function ReportPageItems(props)
{
    return (
        <li className={"list-group-item " + props.class}>
            <a href={props.href}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={props.size}
                    height={props.size}
                    fill="currentColor"
                    className={"bi " + props.iconClass}
                    viewBox="0 0 16 16"
                >
                    <path d={props.path} />
                    
                </svg>
            </a>
        </li>
    );
}