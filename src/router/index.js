import Router from 'vue-router';
import Vue from 'vue';

import Authorize from '@/components/Authorize';
import User from '@/components/User';
import Question from '@/components/Question';
import NotFound from '@/components/NotFound';
import Admin from '@/components/Admin';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Authorize',
            component: Authorize
        },
        {
            path: '/user',
            name: 'User',
            component: User
        },
        {
            path: '/question',
            name: 'Question',
            component: Question
        },
        {
            path: '/admin',
            name: 'Admin',
            component: Admin
        },
        {
            path: '*',
            name: 'NotFound',
            component: NotFound
        }
    ]
});