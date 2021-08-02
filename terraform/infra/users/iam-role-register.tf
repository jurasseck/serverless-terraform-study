resource "aws_iam_role" "register_iam_role" {
  name = "${var.environment}-register-iam-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      },
    ]
  })
}

resource "aws_ssm_parameter" "register_iam_role" {
  name  = "${var.environment}-register-iam-role"
  type  = "String"
  value = aws_iam_role.register_iam_role.arn
}
