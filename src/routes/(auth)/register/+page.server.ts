import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';

import { db } from '../../../lib/utils/database.js';

// redirect user if logged in
export const load = async ({ locals }: any) => {
	if (locals.user) {
		throw redirect(302, '/');
	}
};

const register = async ({ request }: any) => {
	const data = await request.formData();
	const name = data.get('name');
	const email = data.get('email');
	const password = data.get('password');
	const confirmpassword = data.get('confirmpassword');

	if (
		typeof name !== 'string' ||
		typeof email !== 'string' ||
		typeof password !== 'string' ||
		!name ||
		!email ||
		!password ||
		!confirmpassword
	) {
		return fail(400, { invalid: true });
	}

	if (password !== confirmpassword) {
		return fail(400, { passwords: true });
	}

	const user = await db.user.findUnique({
		where: { email }
	});

	if (user) {
		return fail(400, { user: true });
	}

	await db.user.create({
		data: {
			name,
			email,
			password: await bcrypt.hash(password, 10)
		}
	});

	throw redirect(303, '/login');
};

export const actions = { register };
