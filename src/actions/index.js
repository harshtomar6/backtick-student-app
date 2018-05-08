import { checkSignIn, SignOut, getUser, addEmailVerification, 
	createUserWithEmailAndPassword, sendEmailOnForgotPassword, uploadToFirebase,
	facebookLogin,googleLogin, signInWithEmailAndPassword } from './auth';
import { getPostsByPagination, getPosts, updateLikes } from './posts';
import { updateUser, sendUpdateToServer, joinClassToServer } from './user'

export {
	checkSignIn,
	SignOut,
	getUser,
	addEmailVerification,
	createUserWithEmailAndPassword,
	sendEmailOnForgotPassword,
	signInWithEmailAndPassword,
	uploadToFirebase,
	facebookLogin,
	googleLogin,
	getPosts,
	getPostsByPagination,
	updateLikes,
	updateUser,
	sendUpdateToServer,
	joinClassToServer
}
