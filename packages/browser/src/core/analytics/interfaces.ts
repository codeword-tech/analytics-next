import type { Analytics, AnalyticsSettings, InitOptions } from '.'
import type { Plugin } from '../plugin'
import type {
  EventParams,
  DispatchedEvent,
  PageParams,
  UserParams,
  AliasParams,
} from '../arguments-resolver'
import type { Context } from '../context'
import type { SegmentEvent } from '../events'
import type { Group, User } from '../user'
import type { LegacyIntegration } from '../../plugins/ajs-destination/types'

// we can define a contract because:
// - it gives us a neat place to put all our typedocs (they end up being inherited by the class that implements them).
// - it makes it easy to reason about what's being shared between browser and node

/**
 * All of these methods are a no-op.
 */
/** @deprecated */
interface AnalyticsClassicStubs {
  /** @deprecated */
  log(this: never): void
  /** @deprecated */
  addIntegrationMiddleware(this: never): void
  /** @deprecated */
  listeners(this: never): void
  /** @deprecated */
  addEventListener(this: never): void
  /** @deprecated */
  removeAllListeners(this: never): void
  /** @deprecated */
  removeListener(this: never): void
  /** @deprecated */
  removeEventListener(this: never): void
  /** @deprecated */
  hasListeners(this: never): void
  /** @deprecated */
  // This function is only used to add GA and Appcue, but these are already being added to Integrations by AJSN
  addIntegration(this: never): void
  /** @deprecated */
  add(this: never): void
}

/** @deprecated */
export interface AnalyticsClassic extends AnalyticsClassicStubs {
  /** @deprecated */
  initialize(
    settings?: AnalyticsSettings,
    options?: InitOptions
  ): Promise<Analytics>

  /** @deprecated */
  noConflict(): Analytics

  /** @deprecated */
  normalize(msg: SegmentEvent): SegmentEvent

  /** @deprecated */
  readonly failedInitializations: string[]

  /** @deprecated */
  pageview(url: string): Promise<Analytics>

  /**  @deprecated*/
  readonly plugins: any

  /** @deprecated */
  readonly Integrations: Record<string, LegacyIntegration>
}

/**
 * Interface implemented by the snippet ('Analytics')
 */
export interface AnalyticsSnippetCore {
  track(...args: EventParams): Promise<DispatchedEvent>
  page(...args: PageParams): Promise<DispatchedEvent>
  identify(...args: UserParams): Promise<DispatchedEvent>
  group(): Group
  group(...args: UserParams): Promise<DispatchedEvent>
  alias(...args: AliasParams): Promise<DispatchedEvent>
  screen(...args: PageParams): Promise<DispatchedEvent>
  register(...plugins: Plugin[]): Promise<Context>
  deregister(...plugins: string[]): Promise<Context>
  user(): User
  readonly VERSION: string
}

/**
 * Interface implemented by AnalyticsBrowser
 */
export interface AnalyticsBrowserCore {
  track: AnalyticsSnippetCore['track']
  page: AnalyticsSnippetCore['page']
  identify: AnalyticsSnippetCore['identify']
  group(): Promise<Group> // Different than AnalyticsSnippetCore ^
  group(...args: UserParams): Promise<DispatchedEvent>
  alias: AnalyticsSnippetCore['alias']
  screen: AnalyticsSnippetCore['screen']
  register: AnalyticsSnippetCore['register']
  deregister: AnalyticsSnippetCore['deregister']
  user(): Promise<User> // Different than AnalyticsSnippetCore ^
  readonly VERSION: AnalyticsSnippetCore['VERSION']
}
