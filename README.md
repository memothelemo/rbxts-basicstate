# @rbxts/basicstate (Fixed)

**Why are you creating this despite @rbxts/basicstate is available to npm?**

Well, I supposed to do that before [tech0tron](https://github.com/tech0tron/BasicState) makes one. Unfortunately, the types are not accurate, so I sent a [PR](https://github.com/tech0tron/BasicState/pull/3) to make changes.

However, he doesn't seem to respond after waiting couple of weeks. Before this repository is created, one user (from roblox-ts discord server) reported that my forked repo is not working (I found out that he uses the master branch instead of fixed-typings branch) and @rbxts/roact is now outdated.

To avoid massive confusion, I decided to make a seperate repository for this until tech0tron decides to make changes to his own one.

## Getting Started

As of now, I cannot publish this package because of obivous reasons until someone would let me replace this package

```
npm i https://github.com/memothelemo/rbxts-basicstate
```

## Examples

```ts
import BasicState from "@rbxts/basicstate";

interface State {
  Hello: string;
}

const state = new BasicState<State>({
  Hello: "World",
});

state.GetChangedSignal("Hello").Connect((newValue, oldValue) => {
  print(`Hello, ${newValue.Hello}; goodbye ${oldValue.Hello}`);
});

State.SetState({
  Hello: "Roblox",
});

// Triggers the RBXScriptConnection above and prints
// "Hello, Roblox; goodbye World!"
```

**Usage with Roact:**

```ts
import Roact, { Component } from "@rbxts/roact";
import { Store } from "path/to/store";

interface State {
  message: string;
}

class Greeting extends Component<{}, State> {
  public render() {
    return (
      <textlabel
        Size={UDim2.fromOffset(200, 50)}
        Text={this.state.message}
        Event={{
          MouseButton1Click: () => {
            Store.SetState({
              Message: "Peek a boo!",
            });
          },
        }}
      ></textlabel>
    );
  }
}

/**
 * Wrap the component with the
 * BasicState store and inject the value of Hello into
 * the component state.
 */
export default Store.Roact(Greeting, ["Hello"]);
```

## Documentation

[Visit the documentation site](https://csqrl.github.io/BasicState) to get started with BasicState. Take note, this documentation contains Luau code only.
