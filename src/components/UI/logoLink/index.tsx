import Link from 'next/link';
import React from 'react';
import ReusableImage from '../image';

type PropsType = {
	href: string;
	type: "small" | "medium" | "big";
}

const LogoLink: React.FC<PropsType> = (props) => {
	return (
		<Link href={props.href}>
			{/* <ReusableImage /> */}
		</Link>
	)
}


export default LogoLink;