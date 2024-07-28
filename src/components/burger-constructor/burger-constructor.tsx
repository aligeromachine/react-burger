import React from 'react';
import st from './burger-constructor.module.css';
import { Bun } from './bun/bun';
import { NotBun } from './notbun/notbun';
import { ConstructorButton } from './button/button';

export const BurgerConstructor: React.FC = ()
: React.JSX.Element => {

	return(
		<div className={st.flex}>
			<div className={st.elem}>
				<Bun position='top' />
				<NotBun />
				<Bun position='bottom' />
				<ConstructorButton/>				
			</div>
		</div>
	);
}