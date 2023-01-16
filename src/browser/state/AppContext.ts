import React from 'react'

export type AppContextWriteBlock = (draftState: AppContextType) => AppContextType | void

export type AppContextState = {
  example: boolean
}

export type AppContextType = AppContextState & {
  // State updates are done immutably using immer produce (write) block
  // See implementation in WidgetProvider
  update: (writeBlock: AppContextWriteBlock) => void
}

// Note: default value is set up in AppProvider state
export const AppContext = React.createContext<AppContextType>({} as AppContextType)
