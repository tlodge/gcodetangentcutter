; Start
;
; Operation:    0
; Type:         Laser Cut
; Paths:        2
; Passes:       1
; Cut rate:     10000 mm/min
;


; Pass 0

; Pass 0 Path 0
G0 X-43.56 Y0.48

; constant power
; M3

; Adaptive Power ($31 must be set to 1)
M4
S1000.00
M3 S0
G0 Z66
G4 P1.641421278136298
M3 S1000
G1 X-10.56 Y15.41 F100
M3 S0
G0 Z62
G4 P1.5474362635286392
M3 S1000
G1 X-0.87 Y7.96
M3 S0
G0 Z-39
G4 P0.9657386664475395
M3 S1000
G1 X12.45 Y8.21
M3 S0
G0 Z91
G4 P2.269326371586344
M3 S1000
G1 X12.50 Y-1.27
M3 S0
G0 Z-83
G4 P2.0873119201696375
M3 S1000
G1 X19.03 Y-1.98
M3 S0
G0 Z-94
G4 P2.3533825603080762
M3 S1000
G1 X19.42 Y8.81
M3 S0
G0 Z17
G4 P0.4305003891536904
M3 S1000
G1 X20.12 Y10.81
G0 Z5
G4 P0.5
G1 X21.04 Y12.81
G0 Z6
G4 P0.5
G1 X22.25 Y14.81
G0 Z10
G4 P0.5
G1 X23.98 Y16.82
G0 Z11
G4 P0.5
G1 X25.98 Y18.39
G0 Z11
G4 P0.5
G1 X27.98 Y19.42
G0 Z9
G4 P0.5
G1 X29.98 Y20.07
G0 Z8
G4 P0.5
G1 X31.98 Y20.44
G0 Z6
G4 P0.5
G1 X33.99 Y20.60
G0 Z5
G4 P0.5
G1 X35.99 Y20.59
G0 Z4
G4 P0.5
G1 X37.99 Y20.44
M3 S0
G0 Z68
G4 P1.7045421127092417
M3 S1000
G1 X45.22 Y-2.45
M3 S0
G0 Z16
G4 P0.40602860762806303
M3 S1000
G1 X45.43 Y-11.79
M5

; Pass 0 Path 1
; constant power
; M3

; Adaptive Power ($31 must be set to 1)
M4
S1000.00
M3 S0
G0 Z59
G4 P1.4643669923970037
M3 S1000
G1 X29.55 Y-21.99 F100
M3 S0
G0 Z75
G4 P1.8845907771603887
M3 S1000
G1 X16.76 Y-10.20
M5
; End
G28
GO Z-313
