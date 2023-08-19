#!/usr/bin/env bats

@test 'True is true' {
    [ true = true ]
}

@test 'False is false' {
    [ false = false ]
}
