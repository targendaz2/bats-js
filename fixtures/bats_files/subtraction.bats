#!/usr/bin/env bats

@test 'Subtraction using bc' {
    [ $(bc <<< '5-3') = 2 ]
}

@test 'Subtraction using dc' {
    [ $(dc <<< '5 3 - p') = 2 ]
}
