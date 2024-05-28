/* eslint-disable camelcase */

export function filterEsDocsByUserRole<T extends { access_role: string }>(userRoles: string[], esDocs: T[]) {
    const filteredDocs = esDocs.filter((doc) => {
        const docRoles = doc.access_role.split(',').filter((role) => !!role);
        if (!docRoles.length) {
            return true;
        }
        return docRoles.some((role) => userRoles.includes(role));
    });

    return filteredDocs;
}
