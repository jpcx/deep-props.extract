Module: extract
===============

Non-recursively creates an array of deep paths and properties within an object. Optionally unpacks prototypes and non-enumerable property descriptors. Supports Objects, Arrays, Maps, and Sets.

##### Parameters:

| Name | Type | Attributes | Default | Description |
| --- | --- | --- | --- | --- |
| `host` | [deep-props.extract~Host](https://github.com/jpcx/deep-props.extract/blob/0.1.5/docs/global.md#~Host) |  |  | Object to unpack. |
| `opt` | [deep-props.extract~Options](https://github.com/jpcx/deep-props.extract/blob/0.1.5/docs/global.md#~Options) | \<optional> | {} | Execution settings. |

Source:

*   [deep-props.extract/index.js](https://github.com/jpcx/deep-props.extract/blob/0.1.5/index.js), [line 960](https://github.com/jpcx/deep-props.extract/blob/0.1.5/index.js#L960)

##### Returns:

Array of paths and values or references. Returns Search generator if opt.gen is true.

Type

Array.<[deep-props.extract~PropAt](https://github.com/jpcx/deep-props.extract/blob/0.1.5/docs/global.md#~PropAt)> | [deep-props.extract~ResultGenerator](https://github.com/jpcx/deep-props.extract/blob/0.1.5/docs/global.md#~ResultGenerator)

##### Examples

```js
// Simple nested object

const data = {
  foo: {
    bar: {
      baz: {
        beh: 'qux'
      }
    }
  }
}

// returns [{ path: [ 'foo', 'bar', 'baz', 'beh' ], val: 'qux' }]

extract(data)
```

```js
// Multi-nested object

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

// returns [
//   { path: [ 'foo', 'beh', 'lorem' ], val: 'ex'   },
//   { path: [ 'bar', 'qux', 'ipsum' ], val: 'igne' },
//   { path: [ 'baz', 'quz', 'dolor' ], val: 'vita' }
// ]

extract(data)
```

```js
// Unrooting of Object Keys

const data = new Map().set(
  { foo: 'bar' }, new Map().set(
    { baz: 'beh' }, new Map().set(
      { qux: 'quz' }, new Map().set(
        { quux: 'quuz' }, 'thud'
      )
    )
  )
)

// returns:
// [
//   {
//     path: [ { foo: 'bar' }, { baz: 'beh' }, { qux: 'quz' }, { quux: 'quuz' } ],
//     value: 'thud'
//   },
//   { host: { quux: 'quuz' }, path: ['quux'], value: 'quuz' },
//   { host: { qux: 'quz' }, path: ['qux'], value: 'quz' },
//   { host: { baz: 'beh' }, path: ['baz'], value: 'beh' },
//   { host: { foo: 'bar' }, path: ['foo'], value: 'bar' }
// ]

extract(data)
```

```js
// Extraction from complicated nests

const data = {
  foo: [
    new Map().set(
      'bar', new Set([
        {
          baz: {
            qux: {
              quz: [
                'quux',
                'quuz'
              ]
            }
          }
        },
        {
          lorem: {
            ipsum: 'dolor'
          }
        }
      ])
    )
  ]
}

// returns:
// [
//   {
//     path: [ 'foo', '0', 'bar', '0', 'baz', 'qux', 'quz', '0' ],
//     value: 'quux' },
//   { path: [ 'foo', '0', 'bar', '0', 'baz', 'qux', 'quz', '1' ],
//     value: 'quuz' },
//   { path: [ 'foo', '0', 'bar', '1', 'lorem', 'ipsum' ],
//     value: 'dolor'
//   }
// ]

extract(data)
```

```js
// Verbose Options

const data = { foo: { bar: 'baz' } }
Object.freeze(data.foo)

// returns:
// [
//   {
//     path: ['foo'],
//     value: { bar: 'baz' },
//     writable: true,
//     enumerable: true,
//     configurable: true,
//     parentIsFrozen: false,
//     parentIsSealed: false,
//     parentIsExtensible: true
//   },
//   {
//     path: [ 'foo', 'bar' ],
//     value: 'baz',
//     writable: false,
//     enumerable: true,
//     configurable: false,
//     parentIsFrozen: true,
//     parentIsSealed: true,
//     parentIsExtensible: false
//   }
// ]

extract(data, { stepwise: true, descriptors: true, permissions: true })
```

<hr>

## [Home](https://github.com/jpcx/deep-props.extract/blob/0.1.5/README.md)