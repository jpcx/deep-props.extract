# [deep-props](https://github.com/jpcx/deep-props/blob/master/README.md).extract

Source:

*   [deep-props.extract/index.js](https://github.com/jpcx/deep-props.extract/blob/0.1.6/index.js), [line 7](https://github.com/jpcx/deep-props.extract/blob/0.1.6/index.js#L7)

### Methods

<a name=".assignReferencePoints"></a>
#### (static) assignReferencePoints(props, hostopt, pathopt) → \{Array.<[deep-props.extract~PropAt](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~PropAt)>}

Assigns reference points to a list of properties.

##### Parameters:

| Name | Type | Attributes | Default | Description |
| --- | --- | --- | --- | --- |
| `props` | Array.<[deep-props.extract~Prop](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Prop)> |  |  | Prop array. |
| `host` | [deep-props.extract~Host](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Host) | \<optional> |  | Host object. |
| `path` | Array.<[deep-props.extract~Key](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Key)> | \<optional> | \[\] | Path to current prop array. |

Source:

*   [deep-props.extract/index.js](https://github.com/jpcx/deep-props.extract/blob/0.1.6/index.js), [line 772](https://github.com/jpcx/deep-props.extract/blob/0.1.6/index.js#L772)

##### Returns:

Array of location-tagged Props.

Type

Array.<[deep-props.extract~PropAt](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~PropAt)>

##### Examples

```js
let props = [
  {
    key: 'foo',
    value: 'bar',
    parentIsFrozen: false,
    parentIsSealed: false,
    parentIsExtensible: true
  },
  {
    key: { baz: 'beh' },
    value: { qux: 'quz' },
    parentIsFrozen: false,
    parentIsSealed: false,
    parentIsExtensible: true
  }
]

// returns [
//   {
//     path: ['foo'],
//     value: 'bar',
//     parentIsFrozen: false,
//     parentIsSealed: false,
//     parentIsExtensible: true
//   },
//   {
//     path: [{ foo: 'bar' }],
//     value: { qux: 'quz' },
//     parentIsFrozen: false,
//     parentIsSealed: false,
//     parentIsExtensible: true
//   }
// ]

assignReferencePoints(props)
```

```js
props = [
  {
    key: 'qux',
    value: 'quz',
    parentIsFrozen: false,
    parentIsSealed: false,
    parentIsExtensible: true
  }
]

// returns [
//   {
//     host: { foo: 'bar' },
//     path: ['qux'],
//     value: 'quz',
//     parentIsFrozen: false,
//     parentIsSealed: false,
//     parentIsExtensible: true
//   }
// ]

assignReferencePoints(props, { foo: 'bar' })
```

<a name=".genPropsFromDescriptorEntries"></a>
#### (static) genPropsFromDescriptorEntries(descriptorEntries, permissions, opt) → \{Array.<[deep-props.extract~Prop](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Prop)>}

Converts list of descriptors to prop Array. Attaches information based on options.

##### Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `descriptorEntries` | [deep-props.extract~DescriptorEntries](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~DescriptorEntries) | Matrix of keys and descriptors. |
| `permissions` | [deep-props.extract~Permissions](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Permissions) | Permissions list. |
| `opt` | [deep-props.extract~Options](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Options) | Execution settings. |

Source:

*   [deep-props.extract/index.js](https://github.com/jpcx/deep-props.extract/blob/0.1.6/index.js), [line 292](https://github.com/jpcx/deep-props.extract/blob/0.1.6/index.js#L292)

##### Returns:

Converted 1D Array of properties.

Type

Array.<[deep-props.extract~Prop](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Prop)>

##### Example

```js
// returns [
//   {
//     key: 'foo',
//     value: 'bar',
//     writable: true,
//     enumerable: true,
//     configurable: true,
//     parentIsFrozen: false,
//     parentIsSealed: false,
//     parentIsExtensible: true
//   }
// ]

genPropsFromDescriptorEntries(
  [
    [
      'foo',
      {
        value: 'bar',
        writable: true,
        enumerable: true,
        configurable: true
      }
    ]
  ],
  { parentIsFrozen: false, parentIsSealed: false, parentIsExtensible: true },
  { descriptors: true, permissions: true }
)
```

<a name=".genProtoProp"></a>
#### (static) genProtoProp(container, permissions, opt) → \{Array.<[deep-props.extract~Prop](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Prop)>}

Generates a prop for a target object's prototype.

##### Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `container` | [deep-props.extract~Container](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Container) | Target container. |
| `permissions` | [deep-props.extract~Permissions](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Permissions) | Object permissions. |
| `opt` | [deep-props.extract~Options](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Options) | Execution settings. |

Source:

*   [deep-props.extract/index.js](https://github.com/jpcx/deep-props.extract/blob/0.1.6/index.js), [line 337](https://github.com/jpcx/deep-props.extract/blob/0.1.6/index.js#L337)

##### Returns:

Array with single entry of '\_\_proto\_\_' key and value.

Type

Array.<[deep-props.extract~Prop](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Prop)>

##### Example

```js
// returns [
//   {
//     key: '__proto__',
//     value: {},
//     parentIsFrozen: false,
//     parentIsSealed: false,
//     parentIsExtensible: true
//   }
// ]

genProtoProp(
  {},
  { parentIsFrozen: false, parentIsSealed: false, parentIsExtensible: true },
  { descriptors: true, permissions: true }
)
```

<a name=".getMapProps"></a>
#### (static) getMapProps(container, permissions, opt) → \{Array.<[deep-props.extract~Prop](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Prop)>}

Gets a list of properties within a target Map.

##### Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `container` | [deep-props.extract~Container](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Container) | Target container. |
| `permissions` | [deep-props.extract~Permissions](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Permissions) | Object permissions. |
| `opt` | [deep-props.extract~Options](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Options) | Execution settings. |

Source:

*   [deep-props.extract/index.js](https://github.com/jpcx/deep-props.extract/blob/0.1.6/index.js), [line 442](https://github.com/jpcx/deep-props.extract/blob/0.1.6/index.js#L442)

##### Returns:

Array of associated properties.

Type

Array.<[deep-props.extract~Prop](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Prop)>

##### Example

```js
// returns [
//   {
//     key: 'foo',
//     value: 'bar',
//     parentIsFrozen: false,
//     parentIsSealed: false,
//     parentIsExtensible: true
//   },
//   {
//     key: { baz: 'beh' },
//     value: { qux: 'quz' },
//     parentIsFrozen: false,
//     parentIsSealed: false,
//     parentIsExtensible: true
//   }
// ]

getMapProps(
  new Map([
    [ 'foo', 'bar' ],
    [ { baz: 'beh' }, { qux: 'quz' } ]
  ]),
  { parentIsFrozen: false, parentIsSealed: false, parentIsExtensible: true },
  { descriptors: true, permissions: true }
)
```

<a name=".getObjectPermissions"></a>
#### (static) getObjectPermissions(container) → \{[deep-props.extract~Permissions](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Permissions)}

Gets the frozen, sealed, and extensible statuses of an object.

##### Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `container` | [deep-props.extract~Container](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Container) | Target container. |

Source:

*   [deep-props.extract/index.js](https://github.com/jpcx/deep-props.extract/blob/0.1.6/index.js), [line 246](https://github.com/jpcx/deep-props.extract/blob/0.1.6/index.js#L246)

##### Returns:

Result of the three Object permissions tests.

Type

[deep-props.extract~Permissions](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Permissions)

##### Example

```js
// returns {
//   parentIsFrozen: false, parentIsSealed: false, parentIsExtensible: true
// }

getObjectPermissions({})
```

<a name=".getOwnProps"></a>
#### (static) getOwnProps(container, permissions, opt) → \{Array.<[deep-props.extract~Prop](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Prop)>}

Generates a list of non-inherited properties of a target object.

##### Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `container` | [deep-props.extract~Container](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Container) | Target container. |
| `permissions` | [deep-props.extract~Permissions](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Permissions) | Object permissions. |
| `opt` | [deep-props.extract~Options](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Options) | Execution settings. |

Source:

*   [deep-props.extract/index.js](https://github.com/jpcx/deep-props.extract/blob/0.1.6/index.js), [line 386](https://github.com/jpcx/deep-props.extract/blob/0.1.6/index.js#L386)

##### Returns:

Array of associated properties.

Type

Array.<[deep-props.extract~Prop](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Prop)>

##### Example

```js
// returns [
//   {
//     key: 'foo',
//     value: 'bar',
//     writable: true,
//     enumerable: true,
//     configurable: true,
//     parentIsFrozen: false,
//     parentIsSealed: false,
//     parentIsExtensible: true
//   },
//   {
//     key: 'baz',
//     value: 'beh',
//     writable: true,
//     enumerable: true,
//     configurable: true,
//     parentIsFrozen: false,
//     parentIsSealed: false,
//     parentIsExtensible: true
//   }
// ]

getOwnProps(
  { foo: 'bar', baz: 'beh' },
  { parentIsFrozen: false, parentIsSealed: false, parentIsExtensible: true },
  { descriptors: true, permissions: true }
)
```

<a name=".getProps"></a>
#### (static) getProps(container, opt) → \{Array.<[deep-props.extract~Prop](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Prop)>}

Returns all inherited properties, own properties, special properties, and object permissions.

##### Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `container` | [deep-props.extract~Container](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Container) | Target container. |
| `opt` | [deep-props.extract~Options](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Options) | Execution settings. |

Source:

*   [deep-props.extract/index.js](https://github.com/jpcx/deep-props.extract/blob/0.1.6/index.js), [line 680](https://github.com/jpcx/deep-props.extract/blob/0.1.6/index.js#L680)

##### Returns:

Array of associated properties.

Type

Array.<[deep-props.extract~Prop](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Prop)>

##### Example

```js
const map = new Map(
  [
    [ 'foo', 'bar' ]
  ]
)

// returns [
//   {
//     key: '__proto__',
//     value: Map {},
//     parentIsFrozen: false,
//     parentIsSealed: false,
//     parentIsExtensible: true
//   },
//   {
//     key: 'foo',
//     value: 'bar',
//     parentIsFrozen: false,
//     parentIsSealed: false,
//     parentIsExtensible: true
//   }
// ]

getProps(map, { inherited: true, descriptors: true, permissions: true })
```

<a name=".getSetProps"></a>
#### (static) getSetProps(container, permissions, opt) → \{Array.<[deep-props.extract~Prop](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Prop)>}

Gets a list of properties within a target Set. Uses insertion order as keys.

##### Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `container` | [deep-props.extract~Container](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Container) | Target container. |
| `permissions` | [deep-props.extract~Permissions](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Permissions) | Object permissions. |
| `opt` | [deep-props.extract~Options](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Options) | Execution settings. |

Source:

*   [deep-props.extract/index.js](https://github.com/jpcx/deep-props.extract/blob/0.1.6/index.js), [line 496](https://github.com/jpcx/deep-props.extract/blob/0.1.6/index.js#L496)

##### Returns:

Array of associated properties.

Type

Array.<[deep-props.extract~Prop](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Prop)>

##### Example

```js
// returns [
//   {
//     key: '0',
//     value: 1,
//     parentIsFrozen: false,
//     parentIsSealed: false,
//     parentIsExtensible: true
//   },
//   {
//     key: '1',
//     value: 2,
//     parentIsFrozen: false,
//     parentIsSealed: false,
//     parentIsExtensible: true
//   }
// ]

getSetProps(
  new Set([ 1, 2 ]),
  { parentIsFrozen: false, parentIsSealed: false, parentIsExtensible: true },
  { descriptors: true, permissions: true }
)
```

<a name=".getSpecialProps"></a>
#### (static) getSpecialProps(container, permissions, opt) → \{Array.<[deep-props.extract~Prop](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Prop)>}

Gets any special object properties. If propsCustomizer is supplied, and returns a defined value from target, then getSpecialProps will return this value.

##### Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `container` | [deep-props.extract~Container](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Container) | Target container. |
| `permissions` | [deep-props.extract~Permissions](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Permissions) | Object permissions. |
| `opt` | [deep-props.extract~Options](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Options) | Execution settings. |

Source:

*   [deep-props.extract/index.js](https://github.com/jpcx/deep-props.extract/blob/0.1.6/index.js), [line 630](https://github.com/jpcx/deep-props.extract/blob/0.1.6/index.js#L630)

##### Returns:

Array of associated properties.

Type

Array.<[deep-props.extract~Prop](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Prop)>

##### Examples

```js
const map = new Map(
  [
    [ 'foo', 'bar' ]
  ]
)

// returns [
//   {
//     key: 'foo',
//     value: 'bar',
//     parentIsFrozen: false,
//     parentIsSealed: false,
//     parentIsExtensible: true
//   }
// ]

getSpecialProps(
  map,
  { parentIsFrozen: false, parentIsSealed: false, parentIsExtensible: true },
  { descriptors: true, permissions: true }
)
```

```js
const s = new Set(
  [ 'baz', 'beh' ]
)

// returns [
//   {
//     key: '0',
//     value: 'baz',
//     parentIsFrozen: false,
//     parentIsSealed: false,
//     parentIsExtensible: true
//   },
//   {
//     key: '1',
//     value: 'beh',
//     parentIsFrozen: false,
//     parentIsSealed: false,
//     parentIsExtensible: true
//   }
// ]

getSpecialProps(
  s,
  { parentIsFrozen: false, parentIsSealed: false, parentIsExtensible: true },
  { descriptors: true, permissions: true }
)
```

```js
class NonNativeDataStructure {
  constructor(arr) {
    const values = arr
    this.get = i => values[i]
    this.getValues = () => values
    this.push = x => values.push(x)
  }
}

const custom = new NonNativeDataStructure([ 'qux', 'quz' ])

const propsCustomizer = container => {
  if (container instanceof NonNativeDataStructure) {
    return (
      Object.entries(
        Object.getOwnPropertyDescriptors(
          target.getValues()
        )
      ).filter(
        entry => entry[1].enumerable !== false
      )
    )
  }
}

// returns [
//   {
//     key: '0',
//     value: 'qux',
//     writable: true,
//     enumerable: true,
//     configurable: true,
//     parentIsFrozen: false,
//     parentIsSealed: false,
//     parentIsExtensible: true
//   },
//   {
//     key: '1',
//     value: 'quz',
//     writable: true,
//     enumerable: true,
//     configurable: true,
//     parentIsFrozen: false,
//     parentIsSealed: false,
//     parentIsExtensible: true
//   }
// ]

getSpecialProps(
  custom,
  { parentIsFrozen: false, parentIsSealed: false, parentIsExtensible: true },
  { descriptors: true, permissions: true, propsCustomizer }
)
```

<a name=".isPrimitive"></a>
#### (static) isPrimitive(x) → \{boolean}

Determines if x is a JS primitive. Used to determine if a value should be unpacked.

##### Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `x` | * | Test value. |

Source:

*   [deep-props.extract/index.js](https://github.com/jpcx/deep-props.extract/blob/0.1.6/index.js), [line 224](https://github.com/jpcx/deep-props.extract/blob/0.1.6/index.js#L224)

##### Returns:

True if primitive, false if not.

Type

boolean

##### Examples

```js
// returns true

isPrimitive('foo')
```

```js
// returns false

isPrimitive({})
```

<a name=".mergeOptions"></a>
#### (static) mergeOptions(opt) → \{[deep-props.extract~Options](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Options)}

Merges supplied options with defaults.

##### Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `opt` | [deep-props.extract~Options](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Options) | Options passed to the module. |

Source:

*   [deep-props.extract/index.js](https://github.com/jpcx/deep-props.extract/blob/0.1.6/index.js), [line 931](https://github.com/jpcx/deep-props.extract/blob/0.1.6/index.js#L931)

##### Returns:

Execution settings.

Type

[deep-props.extract~Options](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Options)

##### Examples

```js
// returns { own: true }

mergeOptions({})
```

```js
// returns { own: false, inherited: true }

mergeOptions({ own: false, inherited: true })
```

```js
// returns {
//   inherited: true,
//   own: true,
//   nonEnumerable: true,
//   permissions: true,
//   descriptors: true,
//   stepwise: true,
//   includeRefValues: true,
//   full: true
// }

mergeOptions({ full: true })
```

```js
// returns {
//   inherited: true,
//   own: true,
//   nonEnumerable: true,
//   permissions: true,
//   descriptors: false,
//   stepwise: true,
//   includeRefValues: true,
//   full: true
// }

mergeOptions({ full: true, descriptors: false })
```

<a name=".search"></a>
#### (generator, static) search(host, opt) → \{[deep-props.extract~PropAt](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~PropAt)}

Non-recursively searches through the host object by queueing its children. Attaches information based on options. Determines whether child should be unpacked by checking if it is a primitive. Keeps track of all object references encountered to avoid circular looping. Explores object keys via creation of a new Host.

##### Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `host` | [deep-props.extract~Host](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Host) | Host container supplied to module. |
| `opt` | [deep-props.extract~Options](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Options) | Execution settings. |

Source:

*   [deep-props.extract/index.js](https://github.com/jpcx/deep-props.extract/blob/0.1.6/index.js), [line 844](https://github.com/jpcx/deep-props.extract/blob/0.1.6/index.js#L844)

##### Returns:

Undefined if done.

Type

undefined

##### Yields:

Current Prop with attached location.

Type

[deep-props.extract~PropAt](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~PropAt)

##### Examples

```js
// Searching through an Object

const data = {
  foo: {
    bar: {
      baz: {
        beh: 'qux'
      }
    }
  }
}

const query = search(data, { own: true })
for (let step of query) {
  // iterates once:
  // 1: step === { path: [ 'foo', 'bar', 'baz', 'beh' ], value: 'qux' }
}
```

```js
// Searching through an multi-nested Object

const data = {
  foo: {
    beh: {
      lorem: 'ex'
    }
  },
  bar: {
    qux: {
      ipsum: 'igne'
    }
  },
  baz: {
    quz: {
      dolor: 'vita'
    }
  }
}

const query = search(data, { own: true })
for (let step of query) {
  // iterates 3 times:
  // 1: step === { path: [ 'foo', 'beh', 'lorem' ], value: 'ex'   }
  // 2: step === { path: [ 'bar', 'qux', 'ipsum' ], value: 'igne' }
  // 3: step === { path: [ 'baz', 'quz', 'dolor' ], value: 'vita' }
}
```

### Type Definitions

<a name="~Container"></a>
#### Container

Container object used as a target for child property extraction.

##### Type:

*   Object | Array | Map | WeakMap | Set | WeakSet | [deep-props.extract~Custom](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Custom)

Source:

*   [deep-props.extract/index.js](https://github.com/jpcx/deep-props.extract/blob/0.1.6/index.js), [line 34](https://github.com/jpcx/deep-props.extract/blob/0.1.6/index.js#L34)

<a name="~Custom"></a>
#### Custom

Custom dataset for use as a [Container](#~Container). May be accessed via valid customizer functions.

##### Type:

*   \*

Source:

*   [deep-props.extract/index.js](https://github.com/jpcx/deep-props.extract/blob/0.1.6/index.js), [line 11](https://github.com/jpcx/deep-props.extract/blob/0.1.6/index.js#L11)

##### Example

```js
(() => {
  class CustomDataStructure {
    constructor(array) {
      this.get = i => array[i]
      this.getValues = () => array
      this.push = x => array.push(x)
    }
  }
  return new CustomDataStructure([ 'foo', 'bar' ])
})()
```

<a name="~DescriptorEntries"></a>
#### DescriptorEntries

An Array of Arrays with Key at index 0 and property descriptors object at index 1.

*   Equivalent to the result of `Object.entries(Object.getOwnPropertyDescriptors(Target))`
*   Only relevant property descriptors should be added.

##### Type:

*   Array

Source:

*   [deep-props.extract/index.js](https://github.com/jpcx/deep-props.extract/blob/0.1.6/index.js), [line 52](https://github.com/jpcx/deep-props.extract/blob/0.1.6/index.js#L52)

##### Example

```js
[
  [
    'foo',
    {
      value: 'bar',
      writable: true,
      enumerable: true,
      configurable: true
    }
  ]
]
```

<a name="~Host"></a>
#### Host

A non-primitive [Container](#~Container) which represents the root of a given path.

##### Type:

*   [deep-props.extract~Container](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Container)

Source:

*   [deep-props.extract/index.js](https://github.com/jpcx/deep-props.extract/blob/0.1.6/index.js), [line 40](https://github.com/jpcx/deep-props.extract/blob/0.1.6/index.js#L40)

<a name="~Key"></a>
#### Key

Key used for accessing a child property within a container. When its value is `'__proto__'`, it is used as a stand-in for `Object.getPrototypeOf()`.

##### Type:

*   string | [deep-props.extract~Container](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Container)

Source:

*   [deep-props.extract/index.js](https://github.com/jpcx/deep-props.extract/blob/0.1.6/index.js), [line 28](https://github.com/jpcx/deep-props.extract/blob/0.1.6/index.js#L28)

<a name="~Options"></a>
#### Options

Execution-wide settings supplied to the module. Modifies types of data attached to results. Modifies types of children to extract.

##### Type:

*   Object

##### Properties:

| Name | Type | Attributes | Default | Description |
| --- | --- | --- | --- | --- |
| `inherited` | boolean | \<optional> |  | Whether or not to search for inherited properties. Attaches these keys behind a '\_\_proto\_\_' key. |
| `own` | boolean | \<optional> | true | Whether or not to search for own properties. Defaults to true. |
| `nonEnumerable` | boolean | \<optional> |  | Whether or not to search for and return non-enumerable properties. |
| `permissions` | boolean | \<optional> |  | Whether or not to attach Permissions to results. |
| `descriptors` | boolean | \<optional> |  | Whether or not to attach property descriptors other than 'value' to results. |
| `stepwise` | boolean | \<optional> |  | Whether or not to yield a PropAt object at every step down the chain. |
| `includeRefValues` | boolean | \<optional> |  | Whether or not to attach a value to Props with Refs attached. |
| `gen` | boolean | \<optional> |  | Whether or not to return a generator instead of executing the entire search. |
| `full` | boolean | \<optional> |  | If true, replaces undefined Options with maximum search settings (All options except for propsCustomizer will be set to true). User supplied options supercede any changes here. |
| `propsCustomizer` | [deep-props.extract~PropsCustomizer](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~PropsCustomizer) | \<optional> |  | Function used for custom extraction of PropEntries from a Target. |

Source:

*   [deep-props.extract/index.js](https://github.com/jpcx/deep-props.extract/blob/0.1.6/index.js), [line 167](https://github.com/jpcx/deep-props.extract/blob/0.1.6/index.js#L167)

##### Example

```js
{
  inherited: true,
  own: true,
  nonEnumerable: true,
  permissions: true,
  descriptors: true,
  stepwise: true,
  includeRefValues: true,
  gen: true,
  full: true,
  propsCustomizer: target => {
    if (target instanceof ArrayBuffer && target.byteLength === 16) {
      return Object.entries(
        new Int8Array(target)
      ).map(entry => (
        [
          entry[0], { value: entry[1] }
        ]
      ))
    }
  }
}
```

<a name="~Permissions"></a>
#### Permissions

The result of the Object permissions tests for a Container object.

##### Type:

*   Object

##### Properties:

| Name | Type | Description |
| --- | --- | --- |
| `parentIsFrozen` | boolean | Result of Object.isFrozen(Container) |
| `parentIsSealed` | boolean | Result of Object.isSealed(Container) |
| `parentIsExtensible` | boolean | Result of Object.isExtensible(Container) |

Source:

*   [deep-props.extract/index.js](https://github.com/jpcx/deep-props.extract/blob/0.1.6/index.js), [line 93](https://github.com/jpcx/deep-props.extract/blob/0.1.6/index.js#L93)

<a name="~Prop"></a>
#### Prop

Description of the properties found for a given value during the search,

##### Type:

*   Object

##### Properties:

| Name | Type | Attributes | Description |
| --- | --- | --- | --- |
| `key` | [deep-props.extract~Key](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Key) |  | Key used on the parent (Container) object to retrieve the value. |
| `value` | * | \<optional> | Value described at the Prop's location (if any). In cases of a previously discovered reference (circular or otherwise), value will be replaced with a ref property (unless opt.showRefValues is true). |
| `writable` | boolean | \<optional> | 'Writable' property descriptor of the value. |
| `enumerable` | boolean | \<optional> | 'Enumerable' property descriptor of the value. |
| `configurable` | boolean | \<optional> | 'Configurable' property descriptor of the value. |
| `parentIsFrozen` | boolean | \<optional> | Frozen status of the parent object. |
| `parentIsSealed` | boolean | \<optional> | Sealed status of the parent object. |
| `parentIsExtensible` | boolean | \<optional> | Extensible status of the parent object. |

Source:

*   [deep-props.extract/index.js](https://github.com/jpcx/deep-props.extract/blob/0.1.6/index.js), [line 114](https://github.com/jpcx/deep-props.extract/blob/0.1.6/index.js#L114)

##### Example

```js
{
  key: 'foo',
  value: 'bar',
  writable: true,
  enumerable: true,
  configurable: true,
  parentIsFrozen: false,
  parentIsSealed: false,
  parentIsExtensible: true
}
```

<a name="~PropAt"></a>
#### PropAt

Description of a given level of the chain. Transformed Prop Object with location attched.

##### Type:

*   Object

##### Properties:

| Name | Type | Attributes | Description |
| --- | --- | --- | --- |
| `host` | [deep-props.extract~Host](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Host) | \<optional> | When a non-primitive key has been encountered, a separate chain will be created with that key. Items on that chain will be labeled with a 'host' property to specify which host the path applies to. PropAt Objects lacking a 'host' property imply that the path applies to the initially supplied Host. |
| `path` | Array.<[deep-props.extract~Key](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Key)> |  | Describes the steps taken from the Host in order to reach the Prop's value. |
| `value` | * | \<optional> | Value described at the Prop's location (if any). In cases of a previously discovered reference (circular or otherwise), value will be replaced with a ref property (unless opt.showRefValues is true). |
| `writable` | boolean | \<optional> | 'Writable' property descriptor of the value. |
| `enumerable` | boolean | \<optional> | 'Enumerable' property descriptor of the value. |
| `configurable` | boolean | \<optional> | 'Configurable' property descriptor of the value. |
| `parentIsFrozen` | boolean | \<optional> | Frozen status of the parent object. |
| `parentIsSealed` | boolean | \<optional> | Sealed status of the parent object. |
| `parentIsExtensible` | boolean | \<optional> | Extensible status of the parent object. |
| `ref` | [deep-props.extract~Ref](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Ref) | \<optional> | If the value strictly equals a previously discovered Container, the path and Host (if applicable) of that Container will be provided. |

Source:

*   [deep-props.extract/index.js](https://github.com/jpcx/deep-props.extract/blob/0.1.6/index.js), [line 139](https://github.com/jpcx/deep-props.extract/blob/0.1.6/index.js#L139)

##### Example

```js
{
  path: [ 'foo', 'bar', 'baz', 'beh' ],
  value: 'qux',
  writable: true,
  enumerable: true,
  configurable: true,
  parentIsFrozen: false,
  parentIsSealed: false,
  parentIsExtensible: true
}
```

<a name="~PropsCustomizer"></a>
#### PropsCustomizer(container) → \{[deep-props.extract~DescriptorEntries](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~DescriptorEntries)}

Function supplied in Options that handles Target objects and returns a descriptor matrix of any children within a Custom container. Returns undefined if not applicable.

##### Parameters:

| Name | Type | Description |
| --- | --- | --- |
| `container` | [deep-props.extract~Container](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Container) | Container to analyze for additional children. |

Source:

*   [deep-props.extract/index.js](https://github.com/jpcx/deep-props.extract/blob/0.1.6/index.js), [line 72](https://github.com/jpcx/deep-props.extract/blob/0.1.6/index.js#L72)

##### Returns:

Array of arrays of keys and property descriptor objects.

Type

[deep-props.extract~DescriptorEntries](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~DescriptorEntries)

##### Example

```js
target => {
  if (target instanceof ArrayBuffer && target.byteLength === 16) {
    // Mapping the output of Object.entries to a DescriptorEntries array.
    return Object.entries(
      new Int8Array(target)
    ).map(entry => (
      [
        entry[0], { value: entry[1] }
      ]
    ))
  }
}
```

<a name="~Ref"></a>
#### Ref

Describes the location of a previously encountered target.

##### Type:

*   Object

##### Properties:

| Name | Type | Attributes | Description |
| --- | --- | --- | --- |
| `host` | [deep-props.extract~Host](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Host) | \<optional> | If Host is different than the supplied Host, it will be specified. |
| `path` | Array.<[deep-props.extract~Key](https://github.com/jpcx/deep-props.extract/blob/0.1.6/docs/global.md#~Key)> |  | Path of previously encountered target. |

Source:

*   [deep-props.extract/index.js](https://github.com/jpcx/deep-props.extract/blob/0.1.6/index.js), [line 102](https://github.com/jpcx/deep-props.extract/blob/0.1.6/index.js#L102)

##### Examples

```js
{ path: [ 'foo', 'bar' ] }
```

```js
{ host: { foo: 'bar' }, path: [ 'baz', 'beh' ] }
```

<a name="~ResultGenerator"></a>
#### ResultGenerator

Generator object which yields stepwise operation results.

##### Type:

*   Object

Source:

*   [deep-props.extract/index.js](https://github.com/jpcx/deep-props.extract/blob/0.1.6/index.js), [line 46](https://github.com/jpcx/deep-props.extract/blob/0.1.6/index.js#L46)

<hr>

## [Home](https://github.com/jpcx/deep-props.extract/blob/0.1.6/README.md)