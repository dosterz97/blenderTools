import { identify, Identify, init, setUserId, track } from '@amplitude/analytics-browser'
import { BrowserConfig } from '@amplitude/analytics-types'
import { User } from '@auth0/auth0-react'

export const initializeAnalytics = (user?: User, config?: BrowserConfig) => {
  if (!process.env.REACT_APP_AMPLITUDE_API_KEY) {
    throw Error('Missing REACT_APP_AMPLITUDE_API_KEY')
  }

  init(process.env.REACT_APP_AMPLITUDE_API_KEY, user?.email, config)
  setUser(user)
  console.log('initialized analytics')
}

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    console.log(eventName, properties)
  }
  track(eventName, properties)
}

export const setUser = (user?: User) => {
  const identifyObj = new Identify()

  if (user) {
    setUserId(user.email)

    user.name && identifyObj.set('name', user.name)
    user.given_name && identifyObj.set('given_name', user.given_name)
    user.family_name && identifyObj.set('family_name', user.family_name)
    user.middle_name && identifyObj.set('middle_name', user.middle_name)
    user.nickname && identifyObj.set('nickname', user.nickname)
    user.preferred_username && identifyObj.set('preffered_username', user.preferred_username)
    user.profile && identifyObj.set('profile', user.profile)
    user.picture && identifyObj.set('picture', user.picture)
    user.website && identifyObj.set('website', user.website)
    user.email && identifyObj.set('preffered_username', user.email)
    user.email_verified && identifyObj.set('preffered_username', user.email_verified)
    user.gender && identifyObj.set('preffered_username', user.gender)
    user.birthdate && identifyObj.set('birthdate', user.birthdate)
    user.zoneinfo && identifyObj.set('zoneinfo', user.zoneinfo)
    user.locale && identifyObj.set('locale', user.locale)
    user.phone_number && identifyObj.set('phone_number', user.phone_number)
    user.phone_number_verified && identifyObj.set('phone_number_verified', user.phone_number_verified)
    user.address && identifyObj.set('address', user.address)
    user.updated_at && identifyObj.set('updated_at', user.updated_at)
    user.sub && identifyObj.set('sub', user.sub)

    console.log('identifyObj', identifyObj)
  }

  identify(identifyObj)
}
