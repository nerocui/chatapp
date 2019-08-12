import React from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';

function Page({ 
	children, 
	color, 
	background,
	location: {
		pathname,
	},
}) {
	const cx = classNames({
		page: true,
	});
	return (
		<section 
			className={cx}
			id={pathname.replace('/','')}
			style={{
			color,
			background,
			}}
		>
			<div className="page__inner">
				{children}
			</div>
		</section>
	);
}

Page.defaultProps = {
	color: '#000000',
	background: '#ffffff',
};

export default withRouter(Page);
