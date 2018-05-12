import { checkSignIn, SignOut, getUser, addEmailVerification, 
	createUserWithEmailAndPassword, sendEmailOnForgotPassword, uploadToFirebase,
	facebookLogin,googleLogin, signInWithEmailAndPassword } from './auth';
import { getPostsByPagination, getPosts, likePost, updateLikes ,sendPost,setCurrentPostStatusBuild} from './posts';
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
	likePost,
	updateLikes,
	updateUser,
	sendUpdateToServer,
	joinClassToServer,
	sendPost,
	setCurrentPostStatusBuild
}
