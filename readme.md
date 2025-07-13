- Difference between JavaScript Object and JSON
  | Feature | **JavaScript Object** | **JSON (JavaScript Object Notation)** |
  | ------------------ | --------------------- | --------------------------------------- |
  | Type | Native JS object | String format |
  | Use Case | In code logic | Data exchange (e.g., APIs) |
  | Keys | Quotes optional | Keys **must** be in **double quotes** |
  | Supports Functions | ✅ Yes | ❌ No |
  | Can Have Comments | ✅ Yes | ❌ No |
  | Conversion | No conversion needed | Use `JSON.stringify()` / `JSON.parse()` |

  - Difference between PATCH and PUT
    | Feature | `PUT` | `PATCH` |
    | ------------ | ---------------------- | -------------------------- |
    | Update type | Full replacement | Partial update |
    | Idempotent? | ✅ Yes | ✅ Usually, but not always |
    | Body content | Entire object required | Only the fields to update |
    | Performance | May be heavier | Lighter and more efficient |
    | Use case | Replace full resource | Modify one or a few fields |
