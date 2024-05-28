import _ from 'lodash';
import config from 'config';
import type { RequestHandler } from 'express';

import { log } from '../../log';

const getConfig: RequestHandler = (req, res) => {
    const data = config.get('config') || {};

    res.status(200).json(data);
};

const getRoutes: RequestHandler = (req, res) => {
    const userRoles = _.get(res, 'locals.user.roles', []) as string[];

    const routes = config.get<{ roles: string[] }[]>('routes') || [];

    const filteredRoutes = routes.filter((route) => route.roles.some((role) => userRoles.includes(role)));

    res.status(200).json(filteredRoutes);
};

const getDocs: RequestHandler = (req, res) => {
    const userRoles = _.get(res, 'locals.user.roles', []);
    const routes = config.get<{ roles: string[] }[]>('docs') || [];

    const filteredDocs = routes.filter((route) => route.roles.some((group) => userRoles.includes(group)));

    res.status(200).json(filteredDocs);
};

const getInfo: RequestHandler = (req, res) => {
    let userInfo = {};
    // get specific field(s) from the user object
    if (req.query.field && typeof req.query.field === 'string') {
        const fields = _.uniq(Array.isArray(req.query.field) ? req.query.field : req.query.field.split(','));

        fields.forEach((field) => {
            userInfo[field] = _.get(res, `locals.user.${field}`);
        });
        log.debug('user getInfo', { fields });
    } else { // get the full user object
        userInfo = _.get(res, 'locals.user', {});
    }
    log.debug('user getInfo', { userInfo });
    res.status(200).json(userInfo);
};

// middleware to check if a user is in a requested group
const hasRole: (requiredRole: string) => RequestHandler = (requiredRole) => (req, res, next) => { // eslint-disable-line consistent-return
    // if group checking is disabled bail out early
    if (config.has('roleChecksDisabled') && config.get('roleChecksDisabled')) {
        return next();
    }
    // if no user object or roles found return 401 early
    if (!res.locals.user || !res.locals.roles.groups || !res.locals.user.roles.length) {
        return res.status(401).send();
    }
    // allow if the user belongs to the required group
    if (res.locals.user.roles.includes(requiredRole)) {
        return next();
    }
    log.warn('hasRoleMiddleware: user does not have role', {
        requiredRole,
        userRoles: res.locals.user.roles,
        path: req.path,
    });
    // access denied/forbidden
    res.status(403).send();
};

const afterVerifyHook = (req, res, next) => {
    res.locals.user = req.auth.jwt;
    next();
};

export default {
    getConfig,
    getRoutes,
    getDocs,
    getInfo,
    hasRole,
    afterVerifyHook,
};
