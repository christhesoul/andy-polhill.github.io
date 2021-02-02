TODO
- use NCC or npm install
- write to a file on gh-pages
- get the actual data

# Daylight Hours action

Thus actions retrieves the daylight hours for a given location

## Inputs

### `id`

**Required** The id of the required location. Default `"id"`.

## Outputs

### `first-light`
### `sunrise`
### `sunset`
### `last-light`

## Example usage

uses: actions/daylight-hours@v1.1
with:
  id: '1234'
