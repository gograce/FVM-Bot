import * as CryptoJS from "crypto-js";
import * as openpgp from "openpgp";
import * as PushAPI from "@pushprotocol/restapi";

const aesDecrypt = ({ cipherText, secretKey }) => {
	const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
	return bytes.toString(CryptoJS.enc.Utf8);
};

const decryptMessage = async ({
	encryptedMessage,
	encryptionType,
	encryptedSecret,
	pgpPrivateKey,
	signature,
	signatureValidationPubliKey,
}) => {
	let plainText = "";
	if (encryptionType !== "PlainText" && encryptionType !== null) {
		plainText = await decryptAndVerifySignature({
			cipherText: encryptedMessage,
			encryptedSecretKey: encryptedSecret,
			privateKeyArmored: pgpPrivateKey,
			publicKeyArmored: signatureValidationPubliKey,
			signatureArmored: signature,
		});
	} else {
		plainText = encryptedMessage;
	}

	return plainText;
};

const decryptAndVerifySignature = async ({
	cipherText,
	encryptedSecretKey,
	privateKeyArmored,
}) => {
	const secretKey = await pgpDecrypt({
		cipherText: encryptedSecretKey,
		toPrivateKeyArmored: privateKeyArmored,
	});
	// await verifySignature({ messageContent: cipherText, signatureArmored, publicKeyArmored })
	return aesDecrypt({ cipherText, secretKey });
};

const pgpDecrypt = async ({ cipherText, toPrivateKeyArmored }) => {
	const message = await openpgp.readMessage({ armoredMessage: cipherText });
	const privateKey = await openpgp.readPrivateKey({
		armoredKey: toPrivateKeyArmored,
	});

	const { data: decrypted } = await openpgp.decrypt({
		message,
		decryptionKeys: privateKey,
	});

	return decrypted;
};

export const decryptConversation = async ({
	messages,
	connectedUser,
	pgpPrivateKey,
	env,
}) => {
	let otherPeer;
	let signatureValidationPubliKey; // To do signature verification it depends on who has sent the message
	let gotOtherPeer = false;
	for (const message of messages) {
		if (message.encType !== "PlainText") {
			if (!pgpPrivateKey) {
				throw Error("Decrypted private key is necessary");
			}
			if (message.fromCAIP10 !== connectedUser.wallets.split(",")[0]) {
				if (!gotOtherPeer) {
					otherPeer = await PushAPI.user.get({
						account: message.fromCAIP10,
						env,
					});
					gotOtherPeer = true;
				}
				signatureValidationPubliKey = otherPeer.publicKey;
			} else {
				signatureValidationPubliKey = connectedUser.publicKey;
			}
			message.messageContent = await decryptMessage({
				encryptedMessage: message.messageContent,
				encryptedSecret: message.encryptedSecret,
				encryptionType: message.encType,
				signature: message.signature,
				signatureValidationPubliKey: signatureValidationPubliKey,
				pgpPrivateKey,
			});
		}
	}
	return messages;
};

