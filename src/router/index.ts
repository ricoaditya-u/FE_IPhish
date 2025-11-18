import keycloak from '@/auth/keycloak'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'Welcome to iPhish',
      component: () => import('../views/landingpage.vue'),
      meta: {
        title: 'Welcome to iPhish',
      },
    },
    {
      path: '/dashboard',
      name: 'Phising Dashboard',
      component: () => import('../views/Dashboard.vue'),
      meta: {
        title: 'Phising Dashboard',
        requiresAuth: true,
      },
    },
    {
      path: '/campaigns',
      name: 'Campaigns IPhish',
      component: () => import('../views/Campaigns.vue'),
      meta: {
        title: 'Campaigns IPhish',
        requiresAuth: true,
      },
    },
    {
      path: '/usersngroups',
      name: 'Users & Groups',
      component: () => import('../views/UsersGroups.vue'),
      meta: {
        title: 'Users & Groups',
        requiresAuth: true,
      },
    },
    {
      path: '/emailtemplates',
      name: 'Email Templates',
      component: () => import('../views/EmailTemplates.vue'),
      meta: {
        title: 'Email Templates',
        requiresAuth: true,
      },
    },
    {
      path: '/landingpages',
      name: 'Landing Pages',
      component: () => import('../views/LandingPages.vue'),
      meta: {
        title: 'Landing Pages',
        requiresAuth: true,
      },
    },
    {
      path: '/sendingprofiles',
      name: 'Sending Profiles',
      component: () => import('../views/SendingProfiles.vue'),
      meta: {
        title: 'Sending Profiles',
        requiresAuth: true,
      },
    },
    {
      path: '/usermanagement',
      name: 'User Management',
      component: () => import('../views/UserManagement.vue'),
      meta: {
        title: 'User Management',
        requiresAuth: true,
      },
    },
    {
      path: '/accountsettings',
      name: 'Account Settings',
      component: () => import('../views/AccountSettings.vue'),
      meta: {
        title: 'Account Settings',
        requiresAuth: true,
      },
    },
    {
      path: '/details/campaign/:id',
      name: 'Detail Campaign',
      component: () => import('../views/DetailCampaign.vue'),
      meta: {
        title: 'Detail Campaign',
        requiresAuth: true,
      },
    },





    {
      path: '/calendar',
      name: 'Calendar',
      component: () => import('../views/Others/Calendar.vue'),
      meta: {
        title: 'Calendar',
      },
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/Others/UserProfile.vue'),
      meta: {
        title: 'Profile',
      },
    },
    {
      path: '/form-elements',
      name: 'Form Elements',
      component: () => import('../views/Forms/FormElements.vue'),
      meta: {
        title: 'Form Elements',
      },
    },
    {
      path: '/basic-tables',
      name: 'Basic Tables',
      component: () => import('../views/Tables/BasicTables.vue'),
      meta: {
        title: 'Basic Tables',
      },
    },
    {
      path: '/line-chart',
      name: 'Line Chart',
      component: () => import('../views/Chart/LineChart/LineChart.vue'),
    },
    {
      path: '/bar-chart',
      name: 'Bar Chart',
      component: () => import('../views/Chart/BarChart/BarChart.vue'),
    },
    {
      path: '/alerts',
      name: 'Alerts',
      component: () => import('../views/UiElements/Alerts.vue'),
      meta: {
        title: 'Alerts',
      },
    },
    {
      path: '/avatars',
      name: 'Avatars',
      component: () => import('../views/UiElements/Avatars.vue'),
      meta: {
        title: 'Avatars',
      },
    },
    {
      path: '/badge',
      name: 'Badge',
      component: () => import('../views/UiElements/Badges.vue'),
      meta: {
        title: 'Badge',
      },
    },

    {
      path: '/buttons',
      name: 'Buttons',
      component: () => import('../views/UiElements/Buttons.vue'),
      meta: {
        title: 'Buttons',
      },
    },

    {
      path: '/images',
      name: 'Images',
      component: () => import('../views/UiElements/Images.vue'),
      meta: {
        title: 'Images',
      },
    },
    {
      path: '/videos',
      name: 'Videos',
      component: () => import('../views/UiElements/Videos.vue'),
      meta: {
        title: 'Videos',
      },
    },
    {
      path: '/blank',
      name: 'Blank',
      component: () => import('../views/Pages/BlankPage.vue'),
      meta: {
        title: 'Blank',
      },
    },

    {
      path: '/error-404',
      name: '404 Error',
      component: () => import('../views/Errors/FourZeroFour.vue'),
      meta: {
        title: '404 Error',
      },
    },

    {
      path: '/signin',
      name: 'Signin',
      component: () => import('../views/Auth/Signin.vue'),
      meta: {
        title: 'Signin',
      },
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('../views/Auth/Signup.vue'),
      meta: {
        title: 'Signup',
      },
    },
  ],
})

export default router

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    if (keycloak.authenticated) {
      try {
        await keycloak.updateToken(30);
        next();
      } catch (error) {
        console.error("Failed to refresh token:", error);
        keycloak.logout();
      }
    } else {
      keycloak.login({redirectUri: window.location.origin + to.fullPath});
    }
  } else {
    next();
  }
  // document.title = `${to.meta.title} | iPhish - AI Phising Simulation Platform`
});
