import Roact from "@rbxts/roact";

type BasicStateNone = undefined & {
	/**
	 * **DO NOT USE!**
	 *
	 * This field exists to differentiate between undefined and that None instance
	 * @hidden
	 * @deprecated
	 */
	readonly _nominal_BasicStateNone: unique symbol;
};

type SetStateType<T> = {
	[index in keyof T]: BasicStateNone | T[index];
};

interface State<T> {
	/**
	 * Retrieve and return a value from the store. Optionally takes a DefaultValue
	 * parameter, which will be returned if the stored value is nil
	 */
	Get<K extends keyof T>(Key: K, DefaultValue?: T[K]): Readonly<T[K]>;

	/**
	 * Sets a value in the state and triggers Changed events. Will not fire
	 * events when the passed value is the same as the already stored value
	 */
	Set<K extends keyof T>(Key: K, Value: T[K] | BasicStateNone): void;

	/**
	 * Delete a key from the store by setting its value to BasicState.None.
	 */
	Delete<K extends keyof T>(Key: K): void;

	/**
	 * Return a deep copy of the current stored state
	 */
	GetState(): Readonly<T>;

	/**
	 * Like React's setState method, SetState accepts a table of key-value pairs,
	 * which will be added to or mutated in the store. This is a deep copy, so
	 * original data will not be overwritten unless specified.
	 */
	SetState(StateTable: Partial<SetStateType<T>>): void;

	/**
	 * Allows a stored boolean value to be toggled between true and false. Will throw
	 * and error if the stored value is not boolean
	 */
	Toggle<K extends keyof T>(Key: K): void;

	/**
	 * Increment a stored number by 1. Optionally takes an Amount parameter, which allows
	 * the user to specify how much to increment by, and a Cap parameter, which will
	 * prevent the value from exceeding the specified number
	 */
	Increment<K extends keyof T>(Key: K, Number?: number, Cap?: number): void;

	/**
	 * Decrement a stored number by 1. As with the Increment method, optional Amount
	 * and Cap parameters may be passed to specify how much to decrement the value by.
	 * Setting a Cap prevents the value from falling below the specified number.
	 */
	Decrement<K extends keyof T>(Key: K, Number?: number, Cap?: number): void;

	/**
	 * Set a value without triggering Changed events and bypasses ProtectType
	 */
	RawSet<K extends keyof T>(Key: K, Value: T[K]): void;

	/**
	 * Creates a new BindableEvent, which is fired when the passed key's value changes.
	 * The returned value is the new BindableEvent's .Event event, to keep consistency
	 * with Roblox's :GetPropertyChangedSignal() method, which returns a single
	 * RBXScriptConnection
	 */
	GetChangedSignal<K extends keyof T>(
		Key: K,
	): RBXScriptSignal<(NewValue: T[K], OldValue: T[K], OldState: Readonly<T>) => void>;

	/**
	 * Wraps a Roact component and injects the given keys into the component's state.
	 * The component will be re-rendered when State changes.
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	Roact<C extends Roact.ComponentConstructor<any, any>>(Component: C, Keys: (keyof T)[]): C;

	/**
	 * Destroys all BindableEvents created using GetChangedSignal, the .Changed event's
	 * BindableEvent, clears the state, and finally the BasicState instance itself
	 */
	Destroy(): void;

	/**
	 * An RBXScriptSignal which is fired any time the state mutates. The Event fires with the following values (in order):
	 */
	Changed: RBXScriptSignal<(OldState: Readonly<T>, ChangedKey: keyof T) => void>;

	/**
	 * A boolean value which determines whether strict type-checking is enabled on the state table.
	 *
	 * This prevents changing the type of stored data, e.g. from a number to a string.
	 * This is disabled by default.
	 */
	ProtectType: boolean;
}

interface StateConstructor {
	/**
	 * Create and returns new BasicState instance
	 */
	new <T>(InitialState: T): State<T>;

	/**
	 * Lua is unable to determine whether a value in a table is nil or undefined,
	 * and removes nil values from tables as a result.
	 *
	 * State.None is designed to stand in to enable you to remove keys
	 * from the state object, which was previously impossible without.
	 *
	 * It can be used directly with `:Set`, `:SetState` or `:RawSet`,
	 * or by using `:Delete` to remove a single key.
	 */
	None: BasicStateNone;
}

/**
 * BasicState is a really, really simple key-value based state management solution.
 * It makes use of BindableEvents to allow your projects to watch for changes in state,
 * and provides a simple API for communication with your state objects.
 *
 * Think Rodux, but much more simple.
 */
declare const BasicState: StateConstructor;
export = BasicState;
