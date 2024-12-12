//npm install bcryptjs

import bcrypt from 'bcryptjs';

export const encrypt = async (passwordPlain) => {
    const hash = await bcrypt.hash(passwordPlain, 10);
    return hash;
}

export const compare = async (passwordPlain, passwordHashed) => {
    return await bcrypt.compare(passwordPlain, passwordHashed);
}