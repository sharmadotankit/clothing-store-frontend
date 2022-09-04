import { Outlet, Link } from 'react-router-dom';
import { Fragment, useContext } from 'react';

import { CartContext } from '../../context/cart.context.js';
import { UserContext } from '../../context/user.context.js';
import { signOutUser } from '../../utils/firebase/firebase.utils.js';

import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component.jsx';
import CartIcon from '../../components/cart-icon/cart-icon.component.jsx';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import './navigation.styles.scss';


const Navigation = () => {
	const { currentUser } = useContext(UserContext);
	const { isCartOpen } = useContext(CartContext);

	const signOutHandler = async () => {
		await signOutUser();
	}

	return (
		<Fragment>
			<div className='navigation'>
				<Link className='logo-container' to='/'>
					<CrwnLogo className='logo;' />
				</Link>
				<div className='nav-links-container'>
					<Link className='nav-link' to='/shop'>
						SHOP
					</Link>
					{
						currentUser ?
							(
								<span className='nav-link' onClick={signOutHandler}>
									SIGN OUT
								</span>
							) :
							(
								<Link className='nav-link' to='auth'>
									SIGN IN
								</Link>
							)
					}
					<CartIcon />
				</div>
				{isCartOpen && <CartDropdown />}
			</div>
			<Outlet />
		</Fragment>
	);
}

export default Navigation;