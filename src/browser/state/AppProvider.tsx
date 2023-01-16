import produce from 'immer'
import { useState } from 'react'

import { AppContext, AppContextType, AppContextWriteBlock } from './AppContext'

type Props = {
  children: JSX.Element
}

export const AppProvider = ({ children }: Props) => {
  const [context, setContext] = useState<AppContextType>({
    example: false,
    // State updates are done immutably using immer produce (write) block
    // See implementation in WidgetProvider
    update: (writeBlock: AppContextWriteBlock) => {
      setContext(currentContext => produce(currentContext, writeBlock))
    }
  })

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>
}
