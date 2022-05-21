# Golang imports group

## `goimports` does not work properly for me because it does not set a valid pattern. E.g: we can have all the imports together (without blank lines between them), and goimports wont care about it.
---
<p> Thats why i created this extension, for obligatory having imports separated, and we can also choose which pattern we want to use<p>

<br>

```
"goImportsGroup.importsOrder": 
"B/T/L"
```
- Builtin
- `Blank line`
- Third party
- `Blank line`
- Local

<br>

```
"goImportsGroup.importsOrder": 
"B/L/T"
```

- Builtin
- `Blank line`
- Local
- `Blank line`
- Third party

<br>

---

# 1. Using

Press Ctrl + Shift + P to open the commands input, and choose > `Go - Order imports from selected file`
